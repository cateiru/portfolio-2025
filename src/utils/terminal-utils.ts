import React, { ReactElement } from 'react'

/**
 * URLを検出してリンクに変換する関数
 */
export const convertUrlsToLinks = (text: string): (string | ReactElement)[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return React.createElement(
        'a',
        {
          key: index,
          href: part,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'terminal-link'
        },
        part
      )
    }
    return part
  })
}

/**
 * 要素が画面内に表示されているかチェックする関数
 */
export const isElementVisible = (element: Element, container: Element): boolean => {
  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  
  return (
    elementRect.bottom <= containerRect.bottom &&
    elementRect.top >= containerRect.top
  )
}

/**
 * 要素をスムーズにスクロールして表示する関数
 */
export const scrollToElement = (element: Element): void => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest'
  })
}

/**
 * デバウンス関数
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}