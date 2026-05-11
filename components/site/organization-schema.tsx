import { organizationSchema, websiteSchema } from "@/lib/schema"
import { JsonLd } from "./json-ld"

export function OrganizationSchema() {
  return <JsonLd data={[organizationSchema(), websiteSchema()]} />
}
