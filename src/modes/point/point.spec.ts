import { TerraDrawMouseEvent } from "../../common";
import { getMockModeConfig } from "../../test/mock-config";
import { getDefaultStyling } from "../../util/styling";
import { TerraDrawPointMode } from "./point.mode";

describe("TerraDrawPointMode", () => {
    const defaultStyles = getDefaultStyling();

    describe("constructor", () => {
        it("constructs with no options", () => {
            const pointMode = new TerraDrawPointMode();
            expect(pointMode.mode).toBe("point");
            expect(pointMode.styles).toStrictEqual({});
            expect(pointMode.state).toBe("unregistered");
        });

        it("constructs with options", () => {
            const pointMode = new TerraDrawPointMode({
                styles: { pointOutlineColor: "#ffffff" },
            });
            expect(pointMode.styles).toStrictEqual({
                pointOutlineColor: "#ffffff",
            });
        });
    });

    describe("lifecycle", () => {
        it("registers correctly", () => {
            const pointMode = new TerraDrawPointMode();
            expect(pointMode.state).toBe("unregistered");
            pointMode.register(getMockModeConfig(pointMode.mode));
            expect(pointMode.state).toBe("registered");
        });

        it("setting state directly throws error", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.state = "started";
            }).toThrowError();
        });

        it("stopping before not registering throws error", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.stop();
            }).toThrowError();
        });

        it("starting before not registering throws error", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.start();
            }).toThrowError();
        });

        it("starting before not registering throws error", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.start();
            }).toThrowError();
        });

        it("registering multiple times throws an error", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.register(getMockModeConfig(pointMode.mode));
                pointMode.register(getMockModeConfig(pointMode.mode));
            }).toThrowError();
        });

        it("can start correctly", () => {
            const pointMode = new TerraDrawPointMode();

            pointMode.register(getMockModeConfig(pointMode.mode));
            pointMode.start();

            expect(pointMode.state).toBe("started");
        });

        it("can stop correctly", () => {
            const pointMode = new TerraDrawPointMode();

            pointMode.register(getMockModeConfig(pointMode.mode));
            pointMode.start();
            pointMode.stop();

            expect(pointMode.state).toBe("stopped");
        });
    });

    describe("onClick", () => {
        it("throws an error if not registered", () => {
            const pointMode = new TerraDrawPointMode();
            const mockMouseEvent = {
                lng: 0,
                lat: 0,
                containerX: 0,
                containerY: 0,
            } as TerraDrawMouseEvent;
            expect(() => {
                pointMode.onClick(mockMouseEvent);
            }).toThrowError();
        });

        it("creates a point if registered", () => {
            const pointMode = new TerraDrawPointMode();

            const mockConfig = getMockModeConfig(pointMode.mode);

            pointMode.register(mockConfig);

            pointMode.onClick({
                lng: 0,
                lat: 0,
                containerX: 0,
                containerY: 0,
            } as TerraDrawMouseEvent);

            expect(mockConfig.onChange).toBeCalledTimes(1);
            expect(mockConfig.onChange).toBeCalledWith(
                [expect.any(String)],
                "create"
            );
        });
    });

    describe("onKeyUp", () => {
        it("does nothing", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.onKeyUp();
            }).not.toThrowError();
        });
    });

    describe("onMouseMove", () => {
        it("does nothing", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.onMouseMove();
            }).not.toThrowError();
        });
    });

    describe("cleanUp", () => {
        it("does nothing", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.cleanUp();
            }).not.toThrowError();
        });
    });

    describe("onDrag", () => {
        it("does nothing", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.onDrag();
            }).not.toThrowError();
        });
    });

    describe("onDragStart", () => {
        it("does nothing", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.onDragStart();
            }).not.toThrowError();
        });
    });

    describe("onDragEnd", () => {
        it("does nothing", () => {
            const pointMode = new TerraDrawPointMode();

            expect(() => {
                pointMode.onDragEnd();
            }).not.toThrowError();
        });
    });


    describe("styling", () => {
        it("gets", () => {
            const pointMode = new TerraDrawPointMode();
            pointMode.register(getMockModeConfig(pointMode.mode));
            expect(pointMode.styles).toStrictEqual({});
        });

        it("set fails if non valid styling", () => {
            const pointMode = new TerraDrawPointMode();
            pointMode.register(getMockModeConfig(pointMode.mode));

            expect(() => {
                (pointMode.styles as unknown) = "test";
            }).toThrowError();

            expect(pointMode.styles).toStrictEqual({});
        });

        it("sets", () => {
            const pointMode = new TerraDrawPointMode();
            pointMode.register(getMockModeConfig(pointMode.mode));

            pointMode.styles = {
                pointColor: "#ffffff",
            };

            expect(pointMode.styles).toStrictEqual({
                pointColor: "#ffffff",
            });
        });
    });
});
