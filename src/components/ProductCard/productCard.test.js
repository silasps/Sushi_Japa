import { fireEvent, render, screen } from "@testing-library/react";
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

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedNavigate,
}));

describe("Teste do Componente ProductCard", () => {
  it("Deve renderizar o componente com as principais informações", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", product.image);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.priceFormatted)).toBeInTheDocument();
    expect(
      screen.getByText("Salmão fresco, arroz temperado, nori e molho shoyu.")
    ).toBeInTheDocument();
  });

  it("Deve disparar o evento de onClick ao clicar no card", () => {
    const { getByTestId } = render(<ProductCard product={product} onClick={mockedNavigate}/>)

    fireEvent.click(screen.getByTestId('product-card-1'))

    expect(mockedNavigate).toBeCalled()
    expect(mockedNavigate).toBeCalledTimes(1)
  })

  it('displays "promoção" when price is less than 10', () => {
    const { getByText } = render(<ProductCard product={{ ...product, price: 5 }} />);
    expect(screen.getByText('promoção')).toBeInTheDocument();
  });

  it('displays "valor normal" when price is 10 or greater', () => {
    const { getByText } = render(<ProductCard product={product} />);
    expect(screen.getByText('valor normal')).toBeInTheDocument();
  });
});
