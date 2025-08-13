import React, { Fragment } from 'react';
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react';

type Side = 'left' | 'right';

interface SidePanelProps {
	isOpen: boolean;
	onClose: () => void;
	side: Side;
	widthClass: string;
	className?: string;
	children: React.ReactNode;
}

export default function SidePanel({ isOpen, onClose, side, widthClass, className, children }: SidePanelProps) {
	return (
		<>
			{/* Desktop static panel */}
			<div className={`hidden md:block ${widthClass}`}>
				<div className={`h-full ${className ?? 'bg-slate-50'}`}>
					{children}
				</div>
			</div>

			{/* Mobile overlay panel */}
			<Transition show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-40 md:hidden" onClose={onClose}>
					<TransitionChild
						as={Fragment}
						enter="transition-opacity ease-linear duration-200"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/30" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-hidden">
						<div className={`absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} flex max-w-full`}>
							<TransitionChild
								as={Fragment}
								enter="transform transition ease-in-out duration-300"
								enterFrom={side === 'left' ? '-translate-x-full' : 'translate-x-full'}
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-300"
								leaveFrom="translate-x-0"
								leaveTo={side === 'left' ? '-translate-x-full' : 'translate-x-full'}
							>
								<DialogPanel className={`${widthClass} h-full bg-slate-50 shadow-xl`}>
									{children}
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}


