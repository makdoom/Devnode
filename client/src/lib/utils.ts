import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractPreview = (content: string, maxLength: number = 200) => {
  // Use a div element to parse and manipulate the HTML content
  const div = document.createElement("div");
  div.innerHTML = content;

  // Extract text content and trim to maxLength characters
  const textContent = div.textContent || div.innerText || "";
  const trimmedContent = textContent.trim().substring(0, maxLength);

  // Ensure the extracted text is properly closed for tags
  div.innerHTML =
    content.length > 200 ? `${trimmedContent}...` : trimmedContent;

  return DOMPurify.sanitize(div.innerHTML);
};
