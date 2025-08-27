import { useState } from 'react';
import '../css/PostPage.css';

function PostPage() {

    const [posts, setPosts] = useState([
        { id: 0, para: 'my heart is broken💔' },
        { id: 1, para: 'Why me?🥺' },
        { id: 2, para: 'I didnt tell her🖤👨‍🦯' },
    ]);

    const [post, setPost] = useState(() => {
        const int = Math.floor(Math.random() * posts.length);
        return posts[int].para;
    });

    const [copy , setCopy] = useState('Copy');

    function setPosting() {
        const int = Math.floor(Math.random() * posts.length);
        setPost(posts[int].para);
    }

    function addPostToPosts() {
        const addpost = prompt('Add this post:');
        if(addpost) {
            setPosts(prev => {
                const newPosts = [...prev, { id: prev.length + 1, para: addpost }];

                const int = Math.floor(Math.random() * newPosts.length);
                setPost(newPosts[int].para);

                return newPosts;
            });
        }
    }

    function deletePost() {
        const newPosts = posts.filter(item => item.para !== post);
        setPosts(newPosts);

        if (newPosts.length > 0) {
            const int = Math.floor(Math.random() * newPosts.length);
            setPost(newPosts[int].para);
        } else {
            setPost("No posts left!");
        }
    }
            
    function editPost() {
        let editInput = prompt('Enter tour text:').trim();
        let thatPost = posts.find(item => item.para === post);
        let isItrepetitive = posts.some(item => item.para === editInput)

        if (editInput !== '') {
            continueTheEdit();
        }else {
            alert('لطفاً مقداری را تعیین کنید!')
        }


        function continueTheEdit () {

            if (!isItrepetitive) {
                if (thatPost) {
                    thatPost.para = editInput;
                    setPost(editInput);
                } else {
                    alert('چنین پستی یافت نشد!')
                }
            }else {
                alert('مقدار وارد شده تکراری است!');
            }

        }
    }

    function copyPost() {
        navigator.clipboard.writeText(post);
        setCopy('Copied!');
        setTimeout(() => setCopy('Copy') , 3000);
    }

    return ( 
        <div className='box'>
            <p className='post'>{post}</p>
            <div className='btnsBox'>
                <button className='btn' onClick={setPosting}>Next</button>
                <button className='btn' onClick={addPostToPosts}>Add</button>
                <button className='btn' onClick={deletePost}>Delete</button>
                <button className='btn' onClick={editPost}>Edit</button>
                <button className='btn' onClick={copyPost}>{copy}</button>
            </div>
        </div>
    );
}

export default PostPage;
