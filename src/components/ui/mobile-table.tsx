
import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

interface MobileTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: Array<{
    key: string
    label: string
    width?: string
    align?: "left" | "center" | "right"
  }>
  data: Array<Record<string, any>>
  onRowClick?: (row: any) => void
  emptyMessage?: string
}

export const MobileTable = React.forwardRef<HTMLDivElement, MobileTableProps>(
  ({ className, columns, data, onRowClick, emptyMessage = "Aucune donnée disponible", ...props }, ref) => {
    const renderCellContent = (row: any, column: any) => {
      const value = row[column.key]
      if (React.isValidElement(value)) {
        return value
      }
      return value?.toString() || "-"
    }

    // Version mobile: Cards empilées
    const MobileView = () => (
      <div className="space-y-3">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>{emptyMessage}</p>
          </div>
        ) : (
          data.map((row, index) => (
            <div
              key={index}
              className={cn(
                "bg-slate-900/50 border border-slate-700 rounded-xl p-4 space-y-3",
                onRowClick && "cursor-pointer hover:bg-slate-800/50 transition-colors"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <div key={column.key} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-medium">{column.label}</span>
                  <div className={cn(
                    "text-white font-semibold",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center"
                  )}>
                    {renderCellContent(row, column)}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    )

    // Version desktop: Table classique avec scroll horizontal
    const DesktopView = () => (
      <ScrollArea className="w-full">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-slate-700">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "text-gray-300 font-semibold",
                    column.width && `w-[${column.width}]`,
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center"
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-400">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  className={cn(
                    "border-slate-700 hover:bg-slate-800/50",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        "text-white",
                        column.align === "right" && "text-right",
                        column.align === "center" && "text-center"
                      )}
                    >
                      {renderCellContent(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    )

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="md:hidden">
          <MobileView />
        </div>
        <div className="hidden md:block">
          <DesktopView />
        </div>
      </div>
    )
  }
)
MobileTable.displayName = "MobileTable"
