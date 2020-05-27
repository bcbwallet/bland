import { ISettings } from '~/interfaces';
import { remote, app } from 'electron';

export const DEFAULT_SEARCH_ENGINES = [
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=%s',
    keywordsUrl: 'http://google.com/complete/search?client=chrome&q=%s',
    keyword: 'google.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACDVBMVEUAAAD+/v7+/v79/f39/f39/f39/f39/f3+/v7+/v79/f39/f39/f39/f3+/v7////9/f39/f39/f39/f3+/v7+/v79/f39/f3+/v7+/v79/f39/f3////+/v79/f3////9/f3+/v7+/v79/f39/f39/f3+/v7////9/f3+/v79/f39/f39/f3////9/f3////+/v7////85uT1pZ7wdGrsVUjqRjjqRTfsU0bvcmj1oZr85OL85+XxgXjqRDbqQzXxf3b3urXrSz7rTD/4v7r1p6DyioHuZVn0m5P3tK73ta/0m5TuZlryjob//v7rSj3tXFD5zMj5y8fsWEzzlIz0kG3vbGH+8vL+9fT+9t37uQfxdyD98O7934b7vAX1kxXrSTT3uLP8zUb5riH/+/v7whz801lChfS/1fv7vQf93H2lxfqfwfn80liqyPr8zkfkwi76/fve6v3B1/v934iztSE8qFCw3byox/rn8P7+9t/2vAmGsDM0qFNGsGLs9+/z9/5UkPVgmfaPx4JcuXXw+fL6/P93p/epyPrm9Oo+rFtMsmfC5cza7+BjsahChfH2+f634MJUtm6Nzp+q2rer27iV0qVkvHs1qFQ3oHdBiePD2Pyj2LE1pWA+jsq54cQ+rFw3qVab0rHn9et7xo82qVRnvn7X7t2h169swIJJsWU4qlZGsGNlvX3Y7t5rzgcKAAAAMXRSTlMADlqcy+367Fknn/f2nSUKjfz7iwkm1dIkMuvqMAuKD/UNV5nI+VYMmiOH09AI6CIvZ7+SkQAAAe5JREFUOMtjYIADRiZmFlY2NnYWZg5GBkzAycVtCAc8vHxo0vwCgoYoQEhYBFleVMwQA4hLIOQlpcBCRsYmpmbmFpZW1mCutAxcP1jextbOHgrsHGzAKqBmyILNd3SyRwLOLmBbIO4QALFd7VGBG9gWObD/QO53hAi7e3h6efsAGb5+EL+ALOECOc8fJB0QCHF/UHAIzCvMDAzyoPAJBcmHhcOEI+B+VVBkYAJSkVHR9vamMYZYgBIDM5CMjYuLT0jEJm+ozMACJJPi4uKSU7AqUGFgBZKpQAVpUJF0BMgABRYDG5DMBCrIwlSQDeSq4lOQA1bADrUiF1NBHtgKkCPzgQoKCpHdVgRSUAx2JMibJXFxpWXlyAoqQAoqwd7kAJJV1TW1tXX1CPmGRqB8E4ilxsDIA6Saa4GgpRUm39YOMqADFNTqDAy8QLqzC6Siuwci39vXD5RvnABkagBjk08IyJhYCwaTJk+ZOm36jNqZs9LTZwOF2TRBCUIYpGtOLQqYOw8UCIZakCSvDWLPX4CsYOEikJiOLiRRSkiDeIuXLIXLL1sOEtHThyVrGbAKw84VK1etXrhm7bR1YK6eASJjSIhjRrSOPnLWEpETQpVm09JFy50SzAoIaQUNTSz5W1FJWUVaVVVaRVlNHSEKACBb24XRQm7rAAAAAElFTkSuQmCC',
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=%s',
    keywordsUrl: '',
    keyword: 'bing.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAANlBMVEUAfX3k8/MAiop7trYAgoL6//8AdXULhIT///+exMQ4l5ew0dFLoaG929v0+/vQ5+eVwsIcjo4kKiufAAAAZElEQVQYlY2QyQ6AMAhEpy0Fuqr//7NWo108OQcSHsMSICJEMoSWR8sLQNCCD/A/AEALYFMy3+wFQdWkg0aLNaoaMM3gbQaV3eVww9HKajL60KbqmJ61QrvXBPQ7WrCRp0vXB5xZ6wZZjwmZbQAAAABJRU5ErkJggg==',
  },
  {
    name: 'Yahoo!',
    url: 'https://search.yahoo.com/search?p=%s',
    keywordsUrl: '',
    keyword: 'yahoo.com',
    icon:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAA3NCSVQICAjb4U/gAAABnklEQVQokZWSPUyTYRSFn/t+rTX9EFp/SICwqIumMUwaJxdlYHAgBJwMCa5sLMaITizGARYSNTGROOAAokMHYggLBBIGCIHESBggwfJTQGgLL/3e61CxVWOa3ukO59xz7z1HOmWBSspUhAZCZREZdSfoGSQqprzCgQa945dHT5qef7mSVVdUCFQtapCICGBVAzSE1MUjibvngOSrrTDyixCoXm+P3u6Ipb7akcdbBlp6LzQ2nZ14nW7uugjsb+Qnh/fOSwiQTllQRZC3mgAeyWIO915vAA9l8Z0mgKEn68m+dEE8BIiQ0WD20+7N+/HWwUu5Hw6YGdu99zSmeeyh+9i3U316rRR8cKqx2nB/6lomHdicizeEu2X5zoua/e/5Dy+36ynsX/JWI7K2efxtJnP1lu/jrc5lE93Rtp56YH36eGUq550yim/1McPPNgr9WH9q6XPWHuj2ql2ZOjK/5/9lXN4qkE0HE0N7MbwH1fMGqvCkiC8hHKFdA41A8s2mjzEiNXj/Wiml4TtUZ3E+JiL/TcAfK1WJKRuWitP6EzoWnEvW4UekAAAAAElFTkSuQmCC',
  },
];

export const DEFAULT_SETTINGS: ISettings = {
  theme: 'bland-light',
  darkContents: false,
  shield: true,
  multrin: true,
  animations: true,
  bookmarksBar: false,
  suggestions: true,
  themeAuto: true,
  searchEngines: DEFAULT_SEARCH_ENGINES,
  searchEngine: 0,
  startupBehavior: {
    type: 'empty'
  },
  warnOnQuit: false,
  version: 2,
  downloadsDialog: false,
  downloadsPath: remote
    ? remote.app.getPath('downloads')
    : app
      ? app.getPath('downloads')
      : '',
  doNotTrack: true,
  topBarVariant: 'compact',
};
