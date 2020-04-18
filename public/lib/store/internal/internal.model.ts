import { ViewSchema } from '../../services/view';

export interface InternalState {
	readonly view: ViewSchema | null;
}
