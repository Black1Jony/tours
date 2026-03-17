import { Form, Input, Select, Row, Col } from "antd"
import { Section } from "../tourFormHelpers"

const { Option } = Select

const BasicInfoSection = ({ formData, set }) => (
  <Section title="Basic Info">
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Title is required" },
            { min: 3, message: "At least 3 characters" },
            { max: 120, message: "Max 120 characters" },
          ]}
        >
          <Input
            placeholder="e.g. 7-Day Istanbul Adventure"
            value={formData.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label="Status"
          name="status"
          initialValue="active"
          rules={[{ required: true, message: "Select status" }]}
        >
          <Select value={formData.status} onChange={(v) => set("status", v)}>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="draft">Draft</Option>
            <Option value="archived">Archived</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="Country"
          name="country"
          rules={[
            { required: true, message: "Country is required" },
            { min: 2, message: "At least 2 characters" },
          ]}
        >
          <Input
            placeholder="Turkey"
            value={formData.country}
            onChange={(e) => set("country", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="City"
          name="city"
          rules={[
            { required: true, message: "City is required" },
            { min: 2, message: "At least 2 characters" },
          ]}
        >
          <Input
            placeholder="Istanbul"
            value={formData.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Form.Item
          label="Location Address"
          name="locationAddress"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input
            placeholder="123 Main St, Old Town"
            value={formData.location.address}
            onChange={(e) => set("location.address", e.target.value)}
          />
        </Form.Item>
      </Col>
    </Row>
  </Section>
)

export default BasicInfoSection