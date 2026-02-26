const Create = ({ createForm, title, setTitle, author, setAuthor, url, setUrl }) => {
    return(
        <form onSubmit={createForm}>
            <h1>Create new</h1>
            <label>
                title:<input type="text" value={title} onChange={setTitle} />
            </label>
            <label>
                author:<input type="text" value={author} onChange={setAuthor} />
            </label><label>
                url:<input type="text" value={url} onChange={setUrl} />
            </label>
            <button type="submit">create</button>
        </form>
    )
}

export default Create