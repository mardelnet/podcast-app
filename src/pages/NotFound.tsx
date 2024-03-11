import React from 'react';

/**
 * Functional component representing the NotFound page.
 * This component is rendered when a route is not found.
 * @returns JSX.Element representing the NotFound component.
 */
function NotFound(): JSX.Element {
  return (
    <div data-testid="not-found-component">
      <p>NotFound</p>
    </div>
  );
}

export default NotFound;
