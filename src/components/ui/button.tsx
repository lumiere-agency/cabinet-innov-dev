import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#0F4C81] to-[#0A3F74] text-white hover:from-[#1A64A5] hover:to-[#0F4C81] glow-primary glow-primary-hover hover:-translate-y-0.5 hover:scale-[1.02] cursor-pointer shadow-lg",
        secondary:
          "bg-gradient-to-r from-[#1E7D4D] to-[#146039] text-white hover:from-[#299C60] hover:to-[#1E7D4D] glow-secondary glow-secondary-hover hover:-translate-y-0.5 hover:scale-[1.02] cursor-pointer shadow-lg",
        accent:
          "bg-gradient-to-r from-[#FF6B00] to-[#E05E00] text-white hover:from-[#FF8833] hover:to-[#FF6B00] glow-accent glow-accent-hover hover:-translate-y-0.5 hover:scale-[1.02] cursor-pointer shadow-lg",
        outline:
          "border-slate-200 bg-white/40 text-slate-800 backdrop-blur-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5 hover:scale-[1.01] transition-all shadow-sm duration-300 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white cursor-pointer",
        glass:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:scale-[1.01] shadow-sm duration-300 cursor-pointer",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-50 transition-all cursor-pointer",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-7 gap-1 px-3 text-xs rounded-full [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8.5 gap-1.5 px-4 text-sm rounded-full [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12.5 gap-2 px-7 text-base rounded-full [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-10 rounded-full",
        "icon-xs":
          "size-7 rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8.5 rounded-full",
        "icon-lg": "size-12.5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
