// src/pages/Blog.jsx
import cover1 from "../assets/img/manzanas-manos.jpg";
import cover2 from "../assets/img/miel3.jpg";
import cover3 from "../assets/img/frutillas.jpg";

const posts = [
  {
    id: 1,
    title: "Cómo elegir frutas de temporada",
    date: "2025-09-10",
    excerpt: "Guía simple para aprovechar sabores y ahorrar.",
    cover: cover1,
  },
  {
    id: 2,
    title: "Trucos para que tu miel dure más",
    date: "2025-08-28",
    excerpt: "Cómo conservar aroma y textura sin cristalizar.",
    cover: cover2,
  },
  {
    id: 3,
    title: "3 ideas con frutillas en 10 minutos",
    date: "2025-07-02",
    excerpt: "Fácil, rico y rápido para compartir.",
    cover: cover3,
  },
];

export default function Blog(){
  return (
    <main className="section">
      <div className="container">
        <h1 style={{color:'var(--title)'}}>Blog</h1>

        <div className="card-grid" style={{marginTop:16}}>
          {posts.map(p => (
            <article className="card" key={p.id}>
              <img src={p.cover} alt={p.title}/>
              <div className="card_body">
                <div className="card_meta">
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                </div>
                <h3 style={{margin:"6px 0"}}>{p.title}</h3>
                <p style={{color:'var(--text2)'}}>{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
