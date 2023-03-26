import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from ".";
import { productsActions } from "../../actions/product.action";
import { productsMock } from "../../mocks/products.mock";

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

  it('should navigate to details page on product click', async () => {
    jest.spyOn(productsActions, "getProductsAction").mockResolvedValue({
        data: productsMock,
        status: 200,
        statusText: "OK",
      });

    render(<Home />, { wrapper: BrowserRouter });

    await waitFor(() =>
      expect(productsActions.getProductsAction).toHaveBeenCalledTimes(1),
    );

    const productCard = screen.getByTestId(`product-card-${productsMock.id}`);
    mockedNavigate.click(productCard);

    expect(screen.getByText(productsMock.name)).toBeInTheDocument();
  });
});
