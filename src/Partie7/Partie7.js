import React, { useState } from "react";
import "./Partie7.css";

function Partie7() {
  const testimonials = [
    {
      id: 1,
      score: 1,
      comment:
        "Excellent service. Fiabilité, confiance, flexibilité… et une grande bienveillance et amabilité du gérant. Un vrai service sur mesure que je recommande !",
      rating: "★★★★★",
    },
    {
      id: 2,
      score: 2,
      comment:
        "Je suis extrêmement satisfait du travail de cet artisan ! Il a su écouter mes besoins et a proposé des solutions créatives et efficaces pour mon projet. Le résultat est impeccable, avec une attention aux détails qui montre son expertise et son dévouement. Les délais ont été respectés, et il a toujours été ponctuel et professionnel. Je recommande vivement ses services pour tous ceux qui recherchent un travail de qualité et un vrai sens de l'engagement !",
      rating: "★★★★★",
    },
    {
      id: 3,
      score: 3,
      comment:
        "Un service exceptionnel ! Cet artisan a transformé mon projet en réalité avec un savoir-faire impressionnant. Dès le début, il s'est montré très attentif à mes idées et a su adapter son travail pour correspondre parfaitement à mes attentes. Le chantier a été laissé propre et soigné chaque jour, et le résultat final dépasse vraiment mes espérances. Je suis ravi du rendu et je referai sans hésiter appel à lui pour de futurs projets !",
      rating: "★★★★★",
    },
  ];

  const [expanded, setExpanded] = useState(null);

  const toggleReadMore = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-content">
        {/* Section Header */}
        <div className="testimonial-header">
          <p className="feedback-label">AVIS DE NOS CLIENTS</p>
          <h1>Ce que Nos Clients Disent</h1>
          <h2>A Propos de Nous?</h2>
        </div>

        {/* Testimonials Cards */}
        <div className="testimonial-cards">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
            >
              {/* Profile Picture or Placeholder */}
              <div className="profile-picture">
                <div className="score">{testimonial.score}</div>
              </div>

              {/* Rating and Comment */}
              <div className="rating">{testimonial.rating}</div>
              <p className="testimonial-text">
                {expanded === testimonial.id
                  ? testimonial.comment
                  : `${testimonial.comment.slice(0, 150)}...`}
              </p>
              <button
                className="read-more"
                onClick={() => toggleReadMore(testimonial.id)}
              >
                {expanded === testimonial.id ? "Lire moins" : "Lire Plus"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partie7;
