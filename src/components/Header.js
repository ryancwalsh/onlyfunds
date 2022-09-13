import {Popover} from '@headlessui/react'
import ConnectButton from './Connect'
import Button from "./Button";
import icon from '../data/icon.png'

export default function Header(props) {
    return (
        <Popover className="relative bg-white px-4 sm:px-6 md:space-x-10">
            <div className="max-w-4xl m-auto flex items-center justify-between border-b-2 border-gray-100 py-6">
                <a href="./">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto sm:h-10"
                        src={icon}
                        alt="iNEARtiator Icon"
                    />
                </a>

                <div className="flex gap-4">
                    <Button onClick={() => props.switchTab('explorer')}
                            disabled={props.currentTab === 'explorer'}>
                        Explore
                    </Button>
                    <Button onClick={() => props.switchTab('creator')}
                            disabled={props.currentTab === 'creator'}>
                        Create Project
                    </Button>
                    <Button onClick={() => props.switchTab('manager')}
                            disabled={props.currentTab === 'manager'}>
                        Manage Projects
                    </Button>
                </div>

                <ConnectButton/>
            </div>
        </Popover>
    )
}
