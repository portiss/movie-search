const escapeStringRegexp = require('escape-string-regexp')

const escapeArrayRegexp = a => escapeStringRegexp(a.join(''))

const allowKeys = {
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true,
    ArrowUp: true,
    Backspace: true,
    Enter: true,
    Tab: true,
}

const nameChars = escapeArrayRegexp([
    '~', '!', '@', '#', '$', '%', '^', '&', '(', ')',
    '-', '=', '_', '+', '[', ']', '{', '}', `'`, '.', ' ',
])

const FILTER_PATTERNS = {
    integer: /[0-9]/,
    name: RegExp(`[A-Za-z0-9${nameChars}]`),
}

export const filterInput = pattern => event => {
    if (typeof pattern === 'string') pattern = FILTER_PATTERNS[pattern]
    if (!pattern) throw Error('Bad filterInput pattern')
    if (allowKeys[event.key] || pattern.test(event.key)) return
    event.preventDefault()
}
