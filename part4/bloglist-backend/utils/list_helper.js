const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  const sum = blogPosts.reduce((acc, val) => {return acc + val.likes}, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  let largest = 0;
  blogs.map(b => {
    if(b.likes > largest){
      largest = b.likes
    }
  })
  const largestObj = blogs.filter(b => b.likes === largest)
  return largestObj
}

const mostBlogs = (blogs) => {
  const authors = []

  blogs.forEach(b => {
    const exists = authors.find(a => a.author === b.author)

    if (exists) {
      exists.blog += 1
    }

    else{
      authors.push({author: b.author, blog: 1})
    }
    
  })

  if(authors.length > 0){
    const topAuthor = authors.reduce((max, a) => a.blog > max.blog ? a : max) 
    return topAuthor
  }
  return 0
}

const mostLikes = (blogs) => {
  if(blogs.length > 0){
    const maxLikes = Math.max(...blogs.map(b => b.likes))
    const authorName = blogs.filter(b => b.likes === maxLikes)
    return authorName
  }

  return 0 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}