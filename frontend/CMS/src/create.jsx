import { useContext, useRef, useState } from "react";
import { AuthContext } from './App';
import Header from '../components/nav'
import Error from '../components/error';
import { Editor } from '@tinymce/tinymce-react';
import styles from '../stylesheets/Create.module.css';

function Create(){

    //local state
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        publish: false,
        continent: "North America"
    });

    //texteditor setup
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    //block unauthorised users
    const {isAuthenticated} = useContext(AuthContext);
    if(!isAuthenticated) {
        return (<Error />);
    }

    //handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("countries_token");
        console.log(formData);
        const response = await fetch('http://localhost:3000/posts', {
            mode: 'cors',
            method: 'POST',
            headers: {authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
    }

    //handle text editor input
    function handleEditorChange(value, editor) {
        setFormData({...formData, content: value});
    }

    //handle title input
    function handleTitleChange(e) {
        setFormData({...formData, title: e.target.value});
    }

    //handle publish input
    function handlePublishChange(e) {
        setFormData({...formData, publish: e.target.checked});
    }

    //handle continent input
    function handleContinent(e) {
        setFormData({...formData, continent: e.target.value});
    }

    return(
        <>
            <Header />
            <main>
                <h1>New Post</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input className={styles.titleInput} placeholder="Title" value={formData.title} onChange={handleTitleChange}></input>
                        <label>
                            Publish:
                            <input type="checkbox" value={formData.publish} onChange={handlePublishChange}></input>
                        </label>
                        <label>
                            Continent: 
                            <select name="continent" onChange={handleContinent}>
                                <option value="North America">North America</option>
                                <option value="South America">South America</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="Australia">Australia</option>
                                <option value="Africa">Africa</option>
                            </select>
                        </label>
                    <Editor
                        apiKey= {import.meta.env.VITE_TINY_MCE}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                    <button type="submit">Log editor content</button>
                </form>
            </main>
        </>
    )
}




export default Create;