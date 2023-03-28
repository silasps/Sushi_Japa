import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from ".";
import ProductCard from "../../components/ProductCard";
import { productsActions } from "../../actions/product.action";
import { productsMock } from "../../mocks/products.mock";

const product1 = {
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

describe("Teste da tela Home", () => {
  it("Deve renderizar a quantidade correta de ítens", async () => {
    jest.spyOn(productsActions, "getProductsAction").mockResolvedValue({
      data: productsMock,
      status: 200,
      statusText: "OK",
    });

    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        screen.getByTestId("products-list").childElementCount
      ).toEqual(3);
    });
  });

  it("Deve exibir uma mensagem de erro na tela", async () => {
    jest
      .spyOn(productsActions, "getProductsAction")
      .mockResolvedValue(new Error());

    render(
      <>
        <Home />
        <ToastContainer />
      </>,
      { wrapper: BrowserRouter }
    );

    await waitFor(() => {
      expect(
        screen.getByText(/houve um erro ao buscar os produtos/i)
      ).toBeInTheDocument();
    });
  });

  // it('should navigate to details page on product click', async () => {
  //   const mockProduct = { id: 1, name: 'Product', price: 10, image: 'image' };
  //   productsActions.getProductsAction.mockResolvedValueOnce({
  //     data: [mockProduct],
  //   });

  //   render(<Home />, { wrapper: BrowserRouter });

  //   await waitFor(() =>
  //     expect(productsActions.getProductsAction).toHaveBeenCalledTimes(1),
  //   );

  //   const productCard = screen.getByTestId(`product-card-${mockProduct.id}`);
  //   fireEvent.click(productCard);

  //   expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  // });

});
