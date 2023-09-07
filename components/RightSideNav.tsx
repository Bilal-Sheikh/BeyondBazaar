import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { ModeToggle } from './ui/dark-mode'
import { Search } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { User } from '@clerk/nextjs/server';


interface NavbarProps {
    user: User | null
}

export default function RightSideNav({ user }: NavbarProps) {
    return (
        <>
            <div className="flex flex-1 items-center justify-end gap-3">

                <Button variant={'outline'} className="text-xs w-full justify-start text-gray-400 sm:w-2/5 sm:text-sm">
                    <div className='p-1'>
                        <Search size={17} />
                    </div>
                    Search products...
                </Button>

                <div>
                    <ModeToggle />
                </div>

                <div className='hidden lg:block'>
                    {user ? (
                        < UserButton afterSignOutUrl="/" />
                    ) : (
                        <Link
                            href={'/sign-in'}
                            className={buttonVariants({
                                variant: 'default',
                            })}
                        > SignIn
                        </Link>)
                    }
                </div>
            </div>
        </>
    )
}