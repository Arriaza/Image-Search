import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './hojas de estilo/header.css'
import './hojas de estilo/content.css'
import './hojas de estilo/article.css'

function App() {
  const [photos, setPhotos] = useState([]);
// url
  const open = url => window.open(url);
  console.log({ photos });

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
// unsplash API is called
// a configuration object is passed, which must have the API key that is being created
// we pass the API key to consume it
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_pages=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID sZQ008H3M5RFvnwzGmunSPfzV9drAaJ06mLpdELbVcc'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }} >
            <Form>
              <Field name='search' placeholder='Search images of:' />
            </Form>
          </Formik>
      </header>

      <div className="container">
        <div className="center">
          {photos.map (photo =>
            <article key={photo.id} onClick={() => open(photo.links.html) }>
              <img src={photo.urls.regular} alt={photo.id}/>
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)
          }
        </div>
      </div>

    </div>
  );
}

export default App;
