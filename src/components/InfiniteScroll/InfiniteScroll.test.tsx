import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import InfiniteScroll, { InfiniteScrollProps } from './InfiniteScroll';
import { useInfiniteScroll } from './useInfiniteScroll';

const mockLoadMore = jest.fn();

const defaultProps: InfiniteScrollProps = {
  autoLoad: 0,
  limit: 10,
  items: [
    { id: 1, title: 'Product 1', price: 100, thumbnail: 'image1.jpg' },
    { id: 2, title: 'Product 2', price: 200, thumbnail: 'image2.jpg' },
  ],
  isLoading: false,
  hasMore: true,
  loadMore: mockLoadMore,
};

describe('InfiniteScroll', () => {
  it('renders products', () => {
    render(<InfiniteScroll {...defaultProps} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(<InfiniteScroll {...defaultProps} isLoading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows end of product list message when hasMore is false', () => {
    render(<InfiniteScroll {...defaultProps} hasMore={false} />);
    expect(screen.getByText('End of the product list')).toBeInTheDocument();
  });

  it('shows load more button when showButton is true', () => {
    render(<InfiniteScroll {...defaultProps} />);
    expect(screen.getByText('Load more')).toBeInTheDocument();
  });

  it('calls loadMore function when load more button is clicked', () => {
    render(<InfiniteScroll {...defaultProps} />);
    fireEvent.click(screen.getByText('Load more'));
    expect(mockLoadMore).toHaveBeenCalled();
  });

  it('calls loadMore function when autoLoads', () => {
    const mockLoadMore = jest.fn();
    const defaultProps: InfiniteScrollProps = {
      loadMore: mockLoadMore,
      autoLoad: 3,
      isLoading: false,
      hasMore: true,
      limit: 10,
      items: [
        { id: 1, title: 'Product 1', price: 100, thumbnail: 'image1.jpg' },
        { id: 2, title: 'Product 2', price: 200, thumbnail: 'image2.jpg' },
      ],
    };
  
    const { result } = renderHook(() => useInfiniteScroll(defaultProps));
  
    const { loadMoreRef, handleObserver } = result.current;
  
    act(() => {
      const target = {
        isIntersecting: true,
      };
  
      loadMoreRef.current = document.createElement('div');
      loadMoreRef.current.getBoundingClientRect = () => ({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });
  
      fireEvent.scroll(window, { target });
    });

    handleObserver([{ isIntersecting: true } as IntersectionObserverEntry])
  
    expect(mockLoadMore).toHaveBeenCalled();
  });
});