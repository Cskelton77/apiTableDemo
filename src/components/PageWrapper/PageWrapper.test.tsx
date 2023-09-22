import { render, screen  } from "@testing-library/react";
import PageWrapper from "./PageWrapper";
import { MenuItem } from "../Menu/Menu.interface";

test('Menu should display default menu links with no props', () => {
    render(<PageWrapper title={'title'}>Page Content</PageWrapper>)

    const menu = screen.getByRole('navigation');
    expect(menu).toBeInTheDocument();

    const menuLinks = screen.getAllByRole('listitem');
    expect(menuLinks).toHaveLength(5)
    expect(menuLinks[0]).toHaveTextContent('Home')
    expect(menuLinks[1]).toHaveTextContent('Financial Table')
    expect(menuLinks[2]).toHaveTextContent('About')
    expect(menuLinks[3]).toHaveTextContent('Contact')
    expect(menuLinks[4]).toHaveTextContent('Log Out')
})

test('Menu should display passed in links', () => {
    const testMenuLinks: Array<MenuItem> = [
        {uuid: 1, name: "Link One", link: "/"}, 
        {uuid: 2, name: "Link Two", link: "/table"},  
    ]
    render(<PageWrapper title={'title'} menuLinks={testMenuLinks}>Page Content</PageWrapper>)
    
    const menuLinks = screen.getAllByRole('listitem');
    expect(menuLinks).toHaveLength(2)
    expect(menuLinks[0]).toHaveTextContent('Link One')
    expect(menuLinks[1]).toHaveTextContent('Link Two')
})

test('Page should display children', () => {
    render(<PageWrapper title={'title'}>
        <span>This is the child content</span>
    </PageWrapper>)
    const childContent = screen.getByText('This is the child content')
    expect(childContent).toBeInTheDocument();
})

test('Header should display title', () => {
    render(<PageWrapper title={'this is the title'}>
        <span>Page Content</span>
    </PageWrapper>)

    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('this is the title')
})