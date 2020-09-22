console.log('This file was lazyLoaded.')

export default function () {
  console.log('foo.')
}

setTimeout(() => {
  import( /* webpackChunkName: "bar.lazy" */ './foo/bar/bar').then(module => {
    const bar = module.default

    bar()
  })
}, 2000)
