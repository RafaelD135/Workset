import Store from 'electron-store';
import { type StoreSchema } from '../src/models/StoreSchemaModel';

const store = new Store<StoreSchema>({
	defaults: {
		workspaces: [],
		settings: { language: 'fr', theme: 'system' }
	}
});

export default store;