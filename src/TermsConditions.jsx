import React from "react";
import "./Terms.css";

export default function TermsConditions({ onNavigateBack }) {
  return (
    <div className="terms-page">

      {/* HEADER */}
      <div className="terms-header">
        <button className="back-btn" onClick={onNavigateBack}>
          &#8249;
        </button>
        <h2>TERMS & CONDITIONS</h2>
      </div>

      {/* CONTENT */}
      <div className="terms-content">

        <h3>Condition & Attending</h3>

        <p>
          At enim hic etiam dolore. Dulce amarum, leve asperum, prope longe,
          stare movere, quadratum rotundum. At certe gravius. Nullus est igitur
          cuiusquam dies natalis. Paulum, cum regem Persem captum adduceret,
          eodem flumine invectio?
        </p>

        <p>
          Quare hoc videndum est, possitne nobis hoc ratio philosophorum dare.
          Sed finge non solum callidum eum, qui aliquid improbe faciat, verum
          etiam praepotentem, ut M. Est autem officium, quod ita factum est,
          ut eius facti probabilis ratio reddi possit.
        </p>

        <h3>Terms & Use</h3>

        <p>
          Ut proverbia non nulla veriora sint quam vestra dogmata. Tamen
          aberramus a proposito, et, ne longius, prorsus, inquam, Piso,
          si ista mala sunt, placet. Omnes enim iucundum motum, quo sensus
          hilaretur. Cum id fugiunt, re eadem defendunt, quae Peripatetici,
          verba.
        </p>

        <p>
          Quibusnam praeteritis? Portenta haec esse dicit, quidem hactenus;
          Si id dicis, vicimus. Qui ita affectus, beatum esse numquam
          probabis; Igitur neque stultorum quisquam beatus neque sapientium
          non beatus.
        </p>

        <p>
          Dicam, inquam, et quidem discendi causa magis, quam quo te aut
          Epicurum reprehensum velim. Dolor ergo, id est summum malum,
          metuetur semper, etiamsi non ader.
        </p>

      </div>
    </div>
  );
}