import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createServer } from "@/utilities/testUtilities";
import Home from "./index";
import { MerchantApiResponse } from "@/interfaces";

describe('The table', () => {

    const merchantOne: MerchantApiResponse = {
        id: 1,
        name: 'merchantOne',
        iban: '111',
        discount: {
            minTransactions: 1,
            feeDiscountPercentage: 10
        },
        transactions: [
            {amount: 1000, fee: 100},
            {amount: 2000, fee: 200},
        ]
    }
    const merchantTwo: MerchantApiResponse = {
        id: 2,
        name: 'merchantTwo',
        iban: '222',
        discount: {
            minTransactions: 3,
            feeDiscountPercentage: 10
        },
        transactions: [
            {amount: 4000, fee: 99},
            {amount: 999, fee: 200},
        ]
    }
    createServer([{
            path: '/api/merchants',
            res: ()=> { return ( ['one','two'] )}   
        },{
            path: '/api/merchants/one',
            res: ()=> { return (merchantOne)}
        },{
            path: '/api/merchants/two',
            res: ()=> { return (merchantTwo)}  
    }])

    const renderHome = async () => {
        render(<Home />)
        await (waitFor(() => screen.getByText(/merchantone/i)))
    }

    test('Should render in loading state first', async () => {
        render(<Home />);
        const table = screen.getByRole('rowgroup');
        expect(table).toBeInTheDocument();
        expect(table).toHaveTextContent('Loading...')
    })

    test('Should render with content', async () => {
        await renderHome();
        
        const loadingCol = screen.queryByText(/Loading.../i)
        const searchErr = screen.queryByText(/No transactions match/i)

        const merchantOneRow = screen.getByText(/merchantone/i)
        const merchantTwoRow = screen.getByText(/merchanttwo/i)

        expect(loadingCol).not.toBeInTheDocument();
        expect(searchErr).not.toBeInTheDocument();

        expect(merchantOneRow).toBeInTheDocument();
        expect(merchantTwoRow).toBeInTheDocument();

    })

    test('Should filter content with searchbar', async () => {
        await renderHome();
        
        const searchbar = screen.getByRole("textbox", { name: /searchbar/i });
        await user.click(searchbar);
        await user.keyboard("merchanttwo");

        const merchantOneRow = screen.queryByText(/merchantone/i)
        const merchantTwoRow = screen.queryByText(/merchanttwo/i)

        expect(merchantOneRow).not.toBeInTheDocument();
        expect(merchantTwoRow).toBeInTheDocument();

    })

    test('Should display warning if search gives no results', async () => {
        await renderHome();
        
        const searchbar = screen.getByRole("textbox", { name: /searchbar/i });
        await user.click(searchbar);
        await user.keyboard("abcd");

        const merchantOneRow = screen.queryByText(/merchantone/i)
        const merchantTwoRow = screen.queryByText(/merchanttwo/i)
        const searchErr = screen.queryByText(/No transactions match/i)

        expect(merchantOneRow).not.toBeInTheDocument();
        expect(merchantTwoRow).not.toBeInTheDocument();
        expect(searchErr).toBeInTheDocument();
    })

    test('Should display currency with two decimal places', async () => {
        await renderHome();
        const amounts = screen.getAllByText(/GBP/i)
        amounts.forEach((amount) => {
            expect(amount).toHaveTextContent(RegExp(/(-)?(\d)+\.(\d)+ GBP/))
        })
    })
})
 

