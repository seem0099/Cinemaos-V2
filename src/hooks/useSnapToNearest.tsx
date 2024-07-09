import { useEffect } from "react";

const useSnapToNearest = () => {
  useEffect(() => {
    const snapToNearest = (event: PointerEvent) => {
      console.log("Pointer moved:", event.clientX, event.clientY);

      const elements = document.querySelectorAll<HTMLElement>(
        'button, a, [tabindex], [role="button"], [role="link"]'
      );
      console.log("Interactive elements found:", elements.length);

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
        console.log("Nearest element:", nearestElement);

        // Clear previous outlines
        elements.forEach(element => element.style.outline = 'none');
        
        // Highlight the nearest element
        nearestElement.style.outline = "2px solid blue"; 
        nearestElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    };

    document.addEventListener("pointermove", snapToNearest);

    return () => {
      document.removeEventListener("pointermove", snapToNearest);
    };
  }, []);
};

export default useSnapToNearest;
