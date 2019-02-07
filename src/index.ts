const EAST = 'East';
const LEFT = 'L';
const NORTH = 'North';
const SOUTH = 'South';
const WEST = 'West';

type IDirection = 'East' | 'North' | 'South' | 'West';
type INavigate = 'L' | 'R';

interface IOutput {
    direction: IDirection;
    x: number;
    y: number;
}

export default class App {
    walk(code?: string) {
        const steps = this.findSteps(code);
        const { direction, x, y } = this.moveBySteps(steps);

        return `X: ${x} Y: ${y} Direction: ${direction}`;
    }

    private findDirection(direction: IDirection, navigate: INavigate) {
        if (direction === NORTH) {
            direction = navigate === LEFT ? WEST : EAST;
        } else if (direction === WEST) {
            direction = navigate === LEFT ? SOUTH : NORTH;
        } else if (direction === SOUTH) {
            direction = navigate === LEFT ? EAST : WEST;
        } else if (direction === EAST) {
            direction = navigate === LEFT ? NORTH : SOUTH;
        }

        return direction;
    }

    private findSteps(code: string) {
        return code ? code.match(/[RLW]{1}(?:\d+)?/g) : [];
    }

    private findPosition(step: string, direction: IDirection, y: number, x: number) {
        const [distance = '0'] = step.match(/\d+(?![RLW])/g) || [];

        if (direction === NORTH) {
            y += parseInt(distance, 10);
        }

        if (direction === WEST) {
            x -= parseInt(distance, 10);
        }

        if (direction === EAST) {
            x += parseInt(distance, 10);
        }

        if (direction === SOUTH) {
            y -= parseInt(distance, 10);
        }

        return { x, y };
    }

    private findNavigationCommand(step: string, direction: IDirection) {
        const [navigate = undefined] = step.match(/[RL]/g) || [];

        if (navigate) {
            direction = this.findDirection(direction, navigate as INavigate);
        }

        return direction;
    }

    private moveBySteps(steps: string[]): IOutput {
        let direction: IDirection = NORTH;
        let x: number = 0;
        let y: number = 0;

        steps.forEach((step) => {
            direction = this.findNavigationCommand(step, direction);
            ({ x, y } = this.findPosition(step, direction, y, x));
        });

        return { direction, x, y };
    }
}
