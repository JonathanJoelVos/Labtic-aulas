const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const valores = {
    consumo: event.target.consumo.value,
    valor: Number(event.target.valor.value),
  };
  fetch("http://localhost:3033/aulas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: "labticehfoda123",
    },
    body: JSON.stringify(valores),
  });
  console.log(valores);
});
