import * as Icons from 'react-icons/fa';
import { IconType } from 'react-icons/lib/esm';

const iconName: string = 'FaAddressBook';

// `Icon` é do tipo `IconType | undefined`. =)
const Icon = (Icons as Record<string, IconType | undefined>)[iconName];
