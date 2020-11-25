export const getCurrentPosition = (e: PointerEvent): { id: string; x: number; y: number } => {
  try {
    const target = e.target as HTMLDivElement;
    const { x: parentX, y: parentY } = target.parentElement.getBoundingClientRect();
    const { x: targetX, y: targetY } = target.getBoundingClientRect();
    const id = target.getAttribute('id');
    const x = Math.round(targetX) - Math.round(parentX);
    const y = Math.round(targetY) - Math.round(parentY);

    return { id, x, y };
  } catch (e) {
    return undefined;
  }
};
