import { Provider, ConnectionStatus } from "../types/email";
import { AIConfig } from "../types/ai";

export interface ServiceConfig {
  provider: Provider;
  mockMode?: boolean;
  envVars?: Record<string, string>;
}

export abstract class BaseService<T> {
  protected config: ServiceConfig;
  protected connected: boolean = false;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  async connect(): Promise<boolean> {
    if (this.config.mockMode) {
      this.connected = true;
      return true;
    }

    // Check for required environment variables
    const requiredVars = this.getRequiredEnvVars();
    const allVarsPresent = requiredVars.every(
      (varName) => !!process.env[varName],
    );

    if (!allVarsPresent) {
      // Fallback to mock mode
      this.config.mockMode = true;
      this.connected = true;
      return true;
    }

    try {
      await this.performConnect();
      this.connected = true;
      return true;
    } catch (error) {
      console.error(`Connection failed for ${this.config.provider}:`, error);
      // Fallback to mock mode on failure
      this.config.mockMode = true;
      this.connected = true;
      return true;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.performDisconnect();
      this.connected = false;
    }
  }

  async execute(operation: string, data?: unknown): Promise<T> {
    if (!this.connected) {
      await this.connect();
    }

    if (this.config.mockMode) {
      return this.executeMock(operation, data);
    }

    try {
      return await this.performExecute(operation, data);
    } catch (error) {
      console.error(`Operation ${operation} failed:`, error);
      // Fallback to mock on error
      return this.executeMock(operation, data);
    }
  }

  abstract getRequiredEnvVars(): string[];
  abstract performConnect(): Promise<void>;
  abstract performDisconnect(): Promise<void>;
  abstract performExecute(operation: string, data?: unknown): Promise<T>;
  abstract executeMock(operation: string, data?: unknown): Promise<T>;
}
