import { render, screen } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function TabsExample() {
  return (
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Tab One Content</TabsContent>
      <TabsContent value="two">Tab Two Content</TabsContent>
    </Tabs>
  );
}

describe('Tabs component', () => {
  it('renders triggers and default content', () => {
    render(<TabsExample />);
    expect(screen.getByRole('tab', { name: 'One' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Two' })).toBeInTheDocument();
    expect(screen.getByText('Tab One Content')).toBeInTheDocument();
  });
});
