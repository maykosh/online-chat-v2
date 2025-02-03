import { create } from "react-test-renderer";
import Paginator from "../Paginator";

describe("Paginator component tests", () => {
    test("Paginator should be rendered", () => {
        const component = create(<Paginator totalCount={11} pageSize={1}  portionSize={10}/>)
        const root = component.root;
        const span = root.findByType("span");
        expect(span.props.length).toBe(10);
    });
    test("if pages count is more than 10 button NEXT should be present", () => {
        const component = create(<Paginator totalCount={11} pageSize={1}  portionSize={10}/>)
        const root = component.root;
        const button = root.findAllByType("button");
        expect(button.props.length).toBe(1);
    });
});