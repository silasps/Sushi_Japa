import { render, screen } from "@testing-library/react";
import ProductCard from ".";

const product = {
  id: 1,
  name: "Sushi de salmão",
  description: "Salmão fresco, arroz temperado, nori e molho shoyu.",
  price: 12.5,
  priceFormatted: "R$12,50",
  category: "sushi",
  image:
    "https://j6t2y8j5.rocketcdn.me/wp-content/uploads/2020/06/como-fazer-sushi-em-casa-origem-tipos-desenvolvidos-e-receitas.png",
};

describe("Teste do Componente ProductCard", () => {
  it("Deve renderizar o componente com as principais informações", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', product.image)

    expect(screen.getByText("Sushi de salmão")).toBeInTheDocument();
    expect(screen.getByText("R$12,50")).toBeInTheDocument();
    expect(screen.getByText("Salmão fresco, arroz temperado, nori e molho shoyu.")).toBeInTheDocument();
  });
});
