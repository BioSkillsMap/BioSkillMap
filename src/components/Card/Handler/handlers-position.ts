import { first, map, ReplaySubject, Subject, withLatestFrom } from "rxjs";

interface HandlerPosition {
  x: number;
  y: number;
}

export const sourceHandlerPosition$ = new Subject<HandlerPosition>();
export const targetHandlerPosition$ = new Subject<HandlerPosition>();

export const handlersPosition = targetHandlerPosition$.pipe(
  withLatestFrom(sourceHandlerPosition$),
  map(([targetHandlerPosition, sourceHandlerPosition]) => {
    return {
      targetHandlerPosition,
      sourceHandlerPosition,
    };
  }),
  first()
);
