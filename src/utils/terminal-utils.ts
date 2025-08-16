import React, { ReactElement } from "react";

/**
 * URLを検出してリンクに変換する関数
 */
export const convertUrlsToLinks = (text: string): (string | ReactElement)[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return React.createElement(
        "a",
        {
          key: index,
          href: part,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "terminal-link",
        },
        part
      );
    }
    return part;
  });
};

/**
 * カラーコードを検出して色付きで表示する関数
 */
export const convertColorCodes = (text: string): (string | ReactElement)[] => {
  const colorRegex = /(#[0-9A-Fa-f]{6})/g;
  const parts = text.split(colorRegex);

  return parts.map((part, index) => {
    if (colorRegex.test(part)) {
      return React.createElement(
        "span",
        {
          key: index,
          className: "color-code-display",
        },
        [
          React.createElement(
            "span",
            {
              key: "dot",
              className: "color-dot",
              style: {
                color: part,
              },
            },
            "●"
          ),
          React.createElement(
            "span",
            {
              key: "code",
              className: "color-code",
            },
            `${part}`
          ),
        ]
      );
    }
    return part;
  });
};

/**
 * URLとカラーコードの両方を処理する関数
 */
export const convertTextContent = (text: string): (string | ReactElement)[] => {
  // まずURLを処理
  const urlProcessed = convertUrlsToLinks(text);

  // 次にカラーコードを処理（文字列の部分のみ）
  return urlProcessed.flatMap((part, index) => {
    if (typeof part === "string") {
      return convertColorCodes(part).map((colorPart, colorIndex) => {
        if (React.isValidElement(colorPart)) {
          return React.cloneElement(colorPart, {
            key: `${index}-${colorIndex}`,
          });
        }
        return colorPart;
      });
    }
    return part;
  });
};

/**
 * 要素が画面内に表示されているかチェックする関数
 */
export const isElementVisible = (
  element: Element,
  container: Element
): boolean => {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return (
    elementRect.bottom <= containerRect.bottom &&
    elementRect.top >= containerRect.top
  );
};

/**
 * 要素をスムーズにスクロールして表示する関数
 */
export const scrollToElement = (element: Element): void => {
  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
};

/**
 * デバウンス関数
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
