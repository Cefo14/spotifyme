import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import {
  Container,
  MAX_WIDTH_CLASS_NAMES,
  DEFAULT_MAX_WIDTH,
  NO_PADDING_CLASS_NAME,
  MaxWidth
} from '.';

describe('Container Component', () => {
  describe('when it has no props', () => {
    it('should render it', () => {
      render(
        <Container
          data-testid="Container"
        />
      );

      const container = screen.getByTestId('Container');
      expect(container).toBeInTheDocument();
      expect(container).toBeVisible();

      expect(container).toHaveClass(MAX_WIDTH_CLASS_NAMES[DEFAULT_MAX_WIDTH]);
      expect(container).not.toHaveClass(NO_PADDING_CLASS_NAME);
      expect(container).toHaveTextContent('');
    });
  });

  describe('when it has component prop', () => {
    it('should render it with the html component', () => {
      const role = 'article';

      render(
        <Container
          component={role}
        />
      );

      const component = screen.queryByRole(role);
      expect(component).toBeInTheDocument();
      expect(component).toBeVisible();
    });
  });

  describe('when it has noPadding prop', () => {
    it('should render noPadding className', () => {
      const role = 'article';

      render(
        <Container
          component={role}
          noPadding
        />
      );

      const component = screen.getByRole(role);
      expect(component).toHaveClass(NO_PADDING_CLASS_NAME);
    });
  });

  describe('when it has maxWidth prop', () => {
    it('should render maxWidth className', () => {
      const role = 'article';

      const view = render(
        <Container
          component={role}
        />
      );

      Object.entries(MAX_WIDTH_CLASS_NAMES).forEach(([maxWidth, className]) => {
        view.rerender(
          <Container
            component={role}
            maxWidth={maxWidth as MaxWidth}
          />
        );

        const component = screen.getByRole(role);
        expect(component).toHaveClass(className);
      });
    });
  });

  describe('when it has children prop', () => {
    it('should render the children prop', () => {
      const children = faker.lorem.word();

      render(
        <Container>
          { children }
        </Container>
      );

      const section = screen.queryByText(children);
      expect(section).toBeInTheDocument();
      expect(section).toBeVisible();
    });
  });
});
