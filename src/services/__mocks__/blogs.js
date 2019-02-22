const blogs = [
    {
        likes: 4,
        title: "title",
        author: "author",
        url: "url",
        user: {
            username: "user",
            name: "User",
            id: "5c689e1eedad134c3db82a46"
        },
        id: "5c689e81edad134c3db82a48"
    },
    {
        likes: 2,
        title: "title2",
        author: "author2",
        url: "url2",
        user: {
            username: "user",
            name: "User",
            id: "5c689e1eedad134c3db82a46"
        },
        id: "5c689e8eedad134c3db82a49"
    },
    {
        likes: 3,
        title: "title3",
        author: "author3",
        url: "url3",
        user: {
            username: "user",
            name: "User",
            id: "5c689e1eedad134c3db82a46"
        },
        id: "5c689ea1edad134c3db82a4a"
    },
    {
        likes: 5,
        title: "title4",
        author: "author4",
        url: "url4",
        user: {
            username: "user2",
            name: "User2",
            id: "5c689e38edad134c3db82a47"
        },
        id: "5c689ecbedad134c3db82a4b"
    },
    {
        likes: 5,
        title: "title5",
        author: "author5",
        url: "url5",
        user: {
            username: "user2",
            name: "User2",
            id: "5c689e38edad134c3db82a47"
        },
        id: "5c68bbc8ccd8417156f15e6b"
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = newToken => {}

export default {getAll, setToken}
