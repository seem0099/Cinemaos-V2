import { useEffect } from "react";

const useSnapToNearest = () => {
  useEffect(() => {
    const snapToNearest = (event: PointerEvent) => {
      const elements = document.querySelectorAll<HTMLElement>(
        'button, a, [tabindex], [role="button"], [role="link"]'
      );

      let nearestElement: HTMLElement | null = null;
      let minDistance = Number.MAX_VALUE;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(
          event.clientX - elementCenterX,
          event.clientY - elementCenterY
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestElement = element;
        }
      });

      if (nearestElement) {
        // Remove outline from all elements
        elements.forEach((element) => {
          (element as HTMLElement).style.outline = "none";
        });

        // Highlight the nearest element and focus it
        (nearestElement as HTMLElement).style.outline = "2px solid blue";
        (nearestElement as HTMLElement).focus();
        (nearestElement as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    };

    document.addEventListener("pointermove", snapToNearest);
    document.addEventListener("click", snapToNearest);

    return () => {
      document.removeEventListener("pointermove", snapToNearest);
      document.removeEventListener("click", snapToNearest);
    };
  }, []);
};

export default useSnapToNearest;
