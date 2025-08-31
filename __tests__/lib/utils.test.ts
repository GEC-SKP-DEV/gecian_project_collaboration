import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', false && 'b', undefined as unknown as string, 'c')).toBe('a c');
  });

  it('dedupes Tailwind classes with conflicts', () => {
    // tailwind-merge should remove the first bg-red-500 in favor of bg-blue-500
    expect(cn('bg-red-500 p-2', 'bg-blue-500')).toBe('p-2 bg-blue-500');
  });
});
