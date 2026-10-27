import { ArrowDown, ArrowRight } from 'lucide-react'

export default function ConceptDiagram({ title, steps, caption }) {
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-primary-50/40 p-5 sm:p-6 dark:border-slate-700 dark:from-slate-900 dark:to-primary-900/20">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_0_4px_rgba(59,130,246,0.14)]" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200">{title}</h3>
      </div>
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {steps.map((step, index) => (
          <div key={`${step.label}-${index}`} className="contents">
            <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/80">
              <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">{index + 1}</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.label}</p>
              {step.detail && <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{step.detail}</p>}
            </div>
            {index < steps.length - 1 && (
              <>
                <ArrowDown className="mx-auto h-4 w-4 shrink-0 text-primary-400 md:hidden" aria-hidden="true" />
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-primary-400 md:block" aria-hidden="true" />
              </>
            )}
          </div>
        ))}
      </div>
      {caption && <figcaption className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">{caption}</figcaption>}
    </figure>
  )
}
