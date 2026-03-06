import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import blogService from '../services/blogs.js'

test('Blog\'s title and author are rendered', () => {
    const blog = {
        title: 'Why Ai wont replace software developers',
        author: 'Iman',
        url: 'https//:test.com',
        likes: 8
    }

    render(<Blog blog={blog} />)

    const element1 = screen.getByText('Why Ai wont replace software developers', { exact:false })
    const element2 = screen.getByText('Iman', { exact:false })
    const element3 = screen.queryByText('https//:test.com', { exact:false })
    const element4 = screen.queryByText('8', { exact:false })

    expect(element1).toBeDefined()
    expect(element2).toBeDefined()
    expect(element3).toBeNull()
    expect(element4).toBeNull()
})

test('Show blog details', async() => {
    const blog = {
        title: 'somethings arent important',
        author: 'hana',
        url: 'https//:youtube.com',
        likes: 4,
        user: { username: 'hana123' }
    }

    const currentUser = { username: 'hana123' }

    render(<Blog blog={blog} user={currentUser} />)

    const user = userEvent.setup()

    const button = screen.getByText('view')

    await user.click(button)

    const element1 = screen.getByText('https//:youtube.com', { exact:false })
    const element2 = screen.getByText(4, { exact:false })

    expect(element1).toBeDefined()
    expect(element2).toBeDefined()
})

// i had to improvise by adding a new code outide the course material cos i originally didnt write a prop the like button could use

vi.mock('../services/blogs.js')
test('check if the like is clicked twice', async() => {
    const blog = {
        title: 'I should have made a prop, sorry',
        author: 'naiel',
        url: 'https//:sorry.com',
        likes: 0,
        user: { username: 'naiel123' }
    }

    const currentUser = { username: 'naiel123'}
    const mockPromise = vi.fn().mockResolvedValue({ ...blog, likes: 1 })
    blogService.update = mockPromise

    render(<Blog blog={blog} user={currentUser} blogs={[blog]} setBlogs={vi.fn()} />)

    const user = userEvent.setup()

    const button1 = screen.getByText('view')

    await user.click(button1)

    const button2 = screen.getByText('like')

    await user.click(button2)
    await user.click(button2)

    expect(mockPromise).toHaveBeenCalledTimes(2)
})

