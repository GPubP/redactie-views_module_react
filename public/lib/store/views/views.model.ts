import { ViewSchema } from '../../services/views';

export interface InternalState {
	readonly view: ViewSchema | null;
}
