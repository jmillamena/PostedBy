"""edits post model

Revision ID: ac7be441846d
Revises: c6201b101f7e
Create Date: 2023-11-27 18:38:53.401790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac7be441846d'
down_revision = 'c6201b101f7e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('content_image',
               existing_type=sa.BLOB(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('content_image',
               existing_type=sa.String(),
               type_=sa.BLOB(),
               existing_nullable=True)

    # ### end Alembic commands ###
