// Mock AI responses for when AI services are unavailable
export const mockSummaries: Record<string, string> = {
  'thread-1': 'Project budget discussion between team members. Need to finalize Q3 budget by end of day. Tentative agreement to complete by Thursday.',
  'thread-2': 'Meeting scheduling coordination. Will meet Thursday at 2pm to discuss project timeline.',
};

export const mockSmartReplies: Record<string, string[]> = {
  'mock-gmail-1': [
    "I'll review the budget and have it finalized by EOD.",
    'Let me check with the team and get back to you.',
    'Can we schedule a quick call?',
  ],
  'mock-gmail-2': [
    'Thursday at 2pm works for me.',
    "I'll send the finalized budget by end of day.",
  ],
};

export const mockPriorities: Record<string, number> = {
  'mock-gmail-1': 95,
  'mock-gmail-2': 80,
};