const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
const listItems = document.querySelectorAll('.rainbow-text li');

listItems.forEach((item) => {
  const text = item.textContent;
  item.innerHTML = [...text]
    .map((letter, index) =>
      `<span style="color: ${colors[index % colors.length]}">${letter}</span>`
    )
    .join('');
});
