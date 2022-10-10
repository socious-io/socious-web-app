import {useState, useCallback, useEffect} from 'react';

export function useClientRect() {
  const [rect, setRect] = useState<any>();
  const [node, setNode] = useState<Element>();

  const ref = useCallback((node: Element) => {
    if (node !== null) {
      setNode(node);
      setRect(node.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    if (node) {
      const measure = () => {
        setRect(node.getBoundingClientRect());
      };

      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('resize', measure);
      };
    }
  }, [node]);

  return [rect, ref];
}
