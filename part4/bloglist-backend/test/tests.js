const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  }),
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  }),
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes([{likes: 2}, {likes: 4}])
    assert.strictEqual(result, 6)
  })
})

describe('blog with most likes', () => {

  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
  ]
  const listWithTwoBlog = [
    {
      title: 'New statement',
      author: 'Nabek John',
      url: 'https://google.com',
      likes: 9
    },
    {
      title: 'Another one',
      author: 'Erob Zewdu',
      likes: 23
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, [])
  }),
  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, [{  
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }])
  }),
  test('of a bigger list is the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlog)
    assert.deepStrictEqual(result, [{
      title: 'Another one',
      author: 'Erob Zewdu',
      likes: 23
    }])
  })
})