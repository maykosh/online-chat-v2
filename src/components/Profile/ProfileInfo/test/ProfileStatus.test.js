import { create } from "react-test-renderer";
import ProfileStatus from "../ProfileStatus";

describe("ProfileStatus", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("it-kamasutra.com");
  });

  test("after creation, <span> should contain the status", () => {
    const component = create(<ProfileStatus status="it-kamasutra.com" />);
    const root = component.root;
    const span = root.findByType("span");
    expect(span.props.children).toBe("it-kamasutra.com");
  });
});
